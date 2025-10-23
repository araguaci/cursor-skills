import urllib.request
import urllib.parse
import urllib.error
import html.parser
import json
import sys
from typing import Set, List, Dict
from datetime import datetime  # Import para versionamento

class LinkParser(html.parser.HTMLParser):
    """Parser simples para extrair links <a href> do HTML."""
    def __init__(self):
        super().__init__()
        self.links: List[str] = []

    def handle_starttag(self, tag: str, attrs: List[tuple]) -> None:
        if tag == 'a':
            for attr, value in attrs:
                if attr == 'href' and value:
                    self.links.append(value)

class Crawler:
    """Crawler para navegar e verificar links até 4 níveis."""
    def __init__(self, base_url: str, max_depth: int = 4):
        self.base_url = base_url
        self.max_depth = max_depth
        self.domain = urllib.parse.urlparse(base_url).netloc
        self.visited: Set[str] = set()
        self.broken_links: List[str] = []
        self.total_links: int = 0

    def is_internal_link(self, url: str) -> bool:
        """Verifica se o link é interno ao domínio."""
        parsed = urllib.parse.urlparse(url if url.startswith('http') else urllib.parse.urljoin(self.base_url, url))
        return parsed.netloc == self.domain

    def fetch_page(self, url: str) -> str:
        """Busca o conteúdo HTML de uma URL."""
        try:
            with urllib.request.urlopen(urllib.request.Request(url, method='GET')) as response:
                return response.read().decode('utf-8')
        except (urllib.error.URLError, ValueError):
            return ''

    def check_status(self, url: str) -> int:
        """Verifica o status HTTP de uma URL via HEAD."""
        try:
            req = urllib.request.Request(url, method='HEAD')
            with urllib.request.urlopen(req) as response:
                return response.getcode()
        except urllib.error.HTTPError as e:
            return e.code
        except (urllib.error.URLError, ValueError):
            return 0  # Erro de rede: não conta como 404

    def extract_links(self, html: str) -> List[str]:
        """Extrai links do HTML usando o parser."""
        parser = LinkParser()
        parser.feed(html)
        return [link for link in parser.links if link]

    def crawl(self, url: str, depth: int = 0) -> None:
        """Navegação recursiva limitada por profundidade."""
        if depth > self.max_depth or url in self.visited:
            return

        self.visited.add(url)
        self.total_links += 1

        # Exibição de progresso
        print(f"Processando: {url} (Profundidade: {depth}, Total verificados: {self.total_links})", file=sys.stderr)

        # Verifica status
        status = self.check_status(url)
        if status == 404:
            self.broken_links.append(url)
            print(f"Link quebrado (404) encontrado: {url}", file=sys.stderr)

        if depth == self.max_depth:
            return

        # Busca página para extrair sublinks
        html = self.fetch_page(url)
        if not html:
            return

        links = self.extract_links(html)
        for link in links:
            full_url = urllib.parse.urljoin(url, link)
            if self.is_internal_link(full_url):
                self.crawl(full_url, depth + 1)

    def run(self) -> Dict:
        """Executa o crawler e retorna resultado em dict para JSON."""
        print("Iniciando crawl do site...", file=sys.stderr)
        self.crawl(self.base_url)
        print(f"Crawl concluído. Total de links verificados: {self.total_links}", file=sys.stderr)
        return {
            "base_url": self.base_url,
            "execution_timestamp": datetime.now().isoformat(),  # Para rastreamento
            "max_depth": self.max_depth,
            "total_links_checked": self.total_links,
            "total_broken_links": len(self.broken_links),  # Contagem explícita
            "broken_links": self.broken_links
        }

if __name__ == "__main__":
    base_url = "https://cursor-skills.vercel.app/"
    crawler = Crawler(base_url)
    result = crawler.run()
    
    # Versionamento do nome do arquivo
    timestamp = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
    log_file = f"brokenlinks_{timestamp}.log"
    
    try:
        with open(log_file, 'w', encoding='utf-8') as f:
            json.dump(result, f, indent=2, ensure_ascii=False)
        print(f"Resultado versionado salvo em {log_file} (Total links: {result['total_links_checked']}, Quebrados: {result['total_broken_links']})", file=sys.stderr)
    except (IOError, ValueError) as e:  # Captura erros de escrita ou formatação de data
        print(f"Erro ao escrever no arquivo {log_file}: {e}", file=sys.stderr)