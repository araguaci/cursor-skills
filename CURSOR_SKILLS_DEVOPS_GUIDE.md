# CURSOR-SKILLS: DevOps Excellence
## The Complete Guide to Modern DevOps Practices with CURSOR IDE

### 📚 Table of Contents

#### **Part I: DevOps Fundamentals**
1. **Introduction to Modern DevOps Practices**
2. **CURSOR IDE Setup for DevOps**
3. **Infrastructure as Code (IaC)**
4. **Containerization with Docker**
5. **Orchestration with Kubernetes**

#### **Part II: CI/CD and Automation**
6. **Continuous Integration with GitHub Actions**
7. **Continuous Deployment Strategies**
8. **Testing and Quality Assurance**
9. **Monitoring and Observability**
10. **Security and Compliance**

#### **Part III: Cloud Platforms**
11. **AWS Cloud Services**
12. **Azure Cloud Platform**
13. **Google Cloud Platform**
14. **Multi-Cloud Strategies**
15. **Cost Optimization**

#### **Part IV: Advanced DevOps**
16. **Microservices Architecture**
17. **Service Mesh and API Gateway**
18. **GitOps and GitOps Workflows**
19. **Disaster Recovery and Backup**
20. **Career Development in DevOps**

---

## 📖 Part I: DevOps Fundamentals

### Chapter 1: Introduction to Modern DevOps Practices

#### **The DevOps Revolution in 2024**

DevOps has evolved from a simple concept of bringing development and operations together to a comprehensive culture and set of practices that enable organizations to deliver software faster, more reliably, and with higher quality.

**Why DevOps Matters:**
- **Faster Delivery**: Reduce time from code to production
- **Higher Quality**: Catch issues early in the development cycle
- **Better Collaboration**: Break down silos between teams
- **Improved Reliability**: Automated testing and deployment
- **Cost Efficiency**: Optimize resource utilization

**DevOps in Different Domains:**
```yaml
# Infrastructure as Code
terraform:
  providers: [aws, azure, gcp]
  modules: [networking, compute, storage]

# Containerization
docker:
  images: [nginx, node, python, java]
  orchestration: [kubernetes, docker-swarm]

# CI/CD
github_actions:
  workflows: [build, test, deploy]
  environments: [staging, production]

# Monitoring
observability:
  metrics: [prometheus, grafana]
  logging: [elasticsearch, kibana]
  tracing: [jaeger, zipkin]
```

#### **CURSOR IDE for DevOps**

**Why CURSOR IDE is Perfect for DevOps:**
- **Multi-Language Support**: YAML, JSON, HCL, Python, Shell
- **Infrastructure as Code**: Terraform, Ansible, CloudFormation
- **Container Management**: Docker, Kubernetes manifests
- **CI/CD Integration**: GitHub Actions, GitLab CI, Jenkins
- **AI-Powered Assistance**: Smart code generation and validation

**Essential DevOps Extensions:**
```json
{
  "recommended_extensions": [
    "ms-vscode.vscode-yaml",
    "hashicorp.terraform",
    "ms-kubernetes-tools.vscode-kubernetes-tools",
    "ms-vscode.vscode-docker",
    "redhat.vscode-yaml",
    "ms-vscode.vscode-json",
    "ms-vscode.vscode-markdown",
    "ms-vscode.vscode-github-actions"
  ]
}
```

#### **Modern DevOps Workflow**

**Project Structure:**
```
devops-project/
├── infrastructure/
│   ├── terraform/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   ├── ansible/
│   │   ├── playbooks/
│   │   ├── roles/
│   │   └── inventory/
│   └── cloudformation/
│       ├── templates/
│       └── parameters/
├── applications/
│   ├── frontend/
│   ├── backend/
│   └── api/
├── ci-cd/
│   ├── .github/
│   │   └── workflows/
│   ├── jenkins/
│   └── gitlab-ci/
├── monitoring/
│   ├── prometheus/
│   ├── grafana/
│   └── alertmanager/
├── security/
│   ├── policies/
│   └── compliance/
└── docs/
    ├── architecture/
    ├── runbooks/
    └── procedures/
```

---

### Chapter 2: CURSOR IDE Setup for DevOps

#### **Optimal DevOps Configuration**

**Workspace Settings:**
```json
{
  "yaml.schemas": {
    "https://json.schemastore.org/github-workflow.json": ".github/workflows/*.yml",
    "https://json.schemastore.org/kubernetes.json": "k8s/*.yaml",
    "https://json.schemastore.org/docker-compose.json": "docker-compose*.yml"
  },
  "files.associations": {
    "*.tf": "terraform",
    "*.tfvars": "terraform",
    "*.hcl": "terraform",
    "Dockerfile*": "dockerfile",
    "docker-compose*.yml": "dockercompose",
    "*.yaml": "yaml",
    "*.yml": "yaml"
  },
  "terraform.languageServer": {
    "enabled": true,
    "experimentalFeatures": {
      "validateOnSave": true,
      "prefillRequiredFields": true
    }
  },
  "kubernetes": {
    "vs-kubernetes": {
      "vscode-kubernetes.helm-path": "helm",
      "vscode-kubernetes.kubectl-path": "kubectl"
    }
  }
}
```

**CURSOR IDE DevOps Features:**
```yaml
# Docker Compose with AI suggestions
version: '3.8'

services:
  # CURSOR IDE suggests optimal service configuration
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@db:5432/myapp
    depends_on:
      - db
      - redis
    volumes:
      - ./src:/app/src
    networks:
      - app-network

  # Database service
  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    networks:
      - app-network

  # Redis cache
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - app-network

  # Nginx reverse proxy
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - web
    networks:
      - app-network

volumes:
  postgres_data:
  redis_data:

networks:
  app-network:
    driver: bridge
```

#### **Infrastructure as Code with Terraform**

**Terraform Configuration:**
```hcl
# main.tf
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# VPC Configuration
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "${var.project_name}-vpc"
    Environment = var.environment
  }
}

# Internet Gateway
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name        = "${var.project_name}-igw"
    Environment = var.environment
  }
}

# Public Subnets
resource "aws_subnet" "public" {
  count = length(var.availability_zones)

  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.public_subnet_cidrs[count.index]
  availability_zone        = var.availability_zones[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name        = "${var.project_name}-public-subnet-${count.index + 1}"
    Environment = var.environment
    Type        = "Public"
  }
}

# Private Subnets
resource "aws_subnet" "private" {
  count = length(var.availability_zones)

  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_subnet_cidrs[count.index]
  availability_zone = var.availability_zones[count.index]

  tags = {
    Name        = "${var.project_name}-private-subnet-${count.index + 1}"
    Environment = var.environment
    Type        = "Private"
  }
}

# Route Table for Public Subnets
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name        = "${var.project_name}-public-rt"
    Environment = var.environment
  }
}

# Route Table Association for Public Subnets
resource "aws_route_table_association" "public" {
  count = length(aws_subnet.public)

  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

# Security Group for Web Servers
resource "aws_security_group" "web" {
  name_prefix = "${var.project_name}-web-"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.project_name}-web-sg"
    Environment = var.environment
  }
}

# Security Group for Database
resource "aws_security_group" "database" {
  name_prefix = "${var.project_name}-db-"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.web.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.project_name}-db-sg"
    Environment = var.environment
  }
}

# RDS Subnet Group
resource "aws_db_subnet_group" "main" {
  name       = "${var.project_name}-db-subnet-group"
  subnet_ids = aws_subnet.private[*].id

  tags = {
    Name        = "${var.project_name}-db-subnet-group"
    Environment = var.environment
  }
}

# RDS Instance
resource "aws_db_instance" "main" {
  identifier = "${var.project_name}-db"

  engine         = "postgres"
  engine_version = "15.4"
  instance_class = var.db_instance_class

  allocated_storage     = var.db_allocated_storage
  max_allocated_storage = var.db_max_allocated_storage
  storage_type         = "gp3"
  storage_encrypted    = true

  db_name  = var.db_name
  username = var.db_username
  password = var.db_password

  vpc_security_group_ids = [aws_security_group.database.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name

  backup_retention_period = var.db_backup_retention_period
  backup_window           = "03:00-04:00"
  maintenance_window      = "sun:04:00-sun:05:00"

  skip_final_snapshot = var.environment == "development"
  deletion_protection = var.environment == "production"

  tags = {
    Name        = "${var.project_name}-db"
    Environment = var.environment
  }
}
```

**Variables Configuration:**
```hcl
# variables.tf
variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

variable "project_name" {
  description = "Name of the project"
  type        = string
}

variable "environment" {
  description = "Environment name"
  type        = string
  validation {
    condition     = contains(["development", "staging", "production"], var.environment)
    error_message = "Environment must be one of: development, staging, production."
  }
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  description = "List of availability zones"
  type        = list(string)
  default     = ["us-west-2a", "us-west-2b"]
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnet_cidrs" {
  description = "CIDR blocks for private subnets"
  type        = list(string)
  default     = ["10.0.10.0/24", "10.0.20.0/24"]
}

variable "db_instance_class" {
  description = "RDS instance class"
  type        = string
  default     = "db.t3.micro"
}

variable "db_allocated_storage" {
  description = "Initial allocated storage for RDS"
  type        = number
  default     = 20
}

variable "db_max_allocated_storage" {
  description = "Maximum allocated storage for RDS"
  type        = number
  default     = 100
}

variable "db_name" {
  description = "Name of the database"
  type        = string
  default     = "myapp"
}

variable "db_username" {
  description = "Database username"
  type        = string
  default     = "admin"
}

variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}

variable "db_backup_retention_period" {
  description = "Backup retention period in days"
  type        = number
  default     = 7
}
```

---

### Chapter 3: Infrastructure as Code (IaC)

#### **Terraform Best Practices**

**Module Structure:**
```
modules/
├── networking/
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── README.md
├── compute/
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── README.md
├── storage/
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── README.md
└── security/
    ├── main.tf
    ├── variables.tf
    ├── outputs.tf
    └── README.md
```

**Networking Module:**
```hcl
# modules/networking/main.tf
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = merge(var.tags, {
    Name = "${var.project_name}-vpc"
  })
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = merge(var.tags, {
    Name = "${var.project_name}-igw"
  })
}

resource "aws_subnet" "public" {
  count = length(var.availability_zones)

  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.public_subnet_cidrs[count.index]
  availability_zone        = var.availability_zones[count.index]
  map_public_ip_on_launch = true

  tags = merge(var.tags, {
    Name = "${var.project_name}-public-subnet-${count.index + 1}"
    Type = "Public"
  })
}

resource "aws_subnet" "private" {
  count = length(var.availability_zones)

  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_subnet_cidrs[count.index]
  availability_zone = var.availability_zones[count.index]

  tags = merge(var.tags, {
    Name = "${var.project_name}-private-subnet-${count.index + 1}"
    Type = "Private"
  })
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = merge(var.tags, {
    Name = "${var.project_name}-public-rt"
  })
}

resource "aws_route_table_association" "public" {
  count = length(aws_subnet.public)

  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}
```

**Variables and Outputs:**
```hcl
# modules/networking/variables.tf
variable "project_name" {
  description = "Name of the project"
  type        = string
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
}

variable "availability_zones" {
  description = "List of availability zones"
  type        = list(string)
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets"
  type        = list(string)
}

variable "private_subnet_cidrs" {
  description = "CIDR blocks for private subnets"
  type        = list(string)
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {}
}

# modules/networking/outputs.tf
output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.main.id
}

output "vpc_cidr_block" {
  description = "CIDR block of the VPC"
  value       = aws_vpc.main.cidr_block
}

output "public_subnet_ids" {
  description = "IDs of the public subnets"
  value       = aws_subnet.public[*].id
}

output "private_subnet_ids" {
  description = "IDs of the private subnets"
  value       = aws_subnet.private[*].id
}

output "internet_gateway_id" {
  description = "ID of the Internet Gateway"
  value       = aws_internet_gateway.main.id
}
```

#### **Ansible Configuration Management**

**Playbook Structure:**
```
ansible/
├── playbooks/
│   ├── site.yml
│   ├── webserver.yml
│   ├── database.yml
│   └── monitoring.yml
├── roles/
│   ├── common/
│   │   ├── tasks/main.yml
│   │   ├── handlers/main.yml
│   │   ├── templates/
│   │   └── vars/main.yml
│   ├── nginx/
│   │   ├── tasks/main.yml
│   │   ├── handlers/main.yml
│   │   ├── templates/
│   │   └── vars/main.yml
│   ├── nodejs/
│   │   ├── tasks/main.yml
│   │   ├── handlers/main.yml
│   │   ├── templates/
│   │   └── vars/main.yml
│   └── postgresql/
│       ├── tasks/main.yml
│       ├── handlers/main.yml
│       ├── templates/
│       └── vars/main.yml
├── inventory/
│   ├── production/
│   ├── staging/
│   └── development/
└── group_vars/
    ├── all/
    ├── webservers/
    └── databases/
```

**Main Playbook:**
```yaml
# playbooks/site.yml
---
- name: Configure all servers
  hosts: all
  become: yes
  roles:
    - common

- name: Configure web servers
  hosts: webservers
  become: yes
  roles:
    - nginx
    - nodejs

- name: Configure database servers
  hosts: databases
  become: yes
  roles:
    - postgresql

- name: Configure monitoring
  hosts: monitoring
  become: yes
  roles:
    - prometheus
    - grafana
```

**Common Role:**
```yaml
# roles/common/tasks/main.yml
---
- name: Update package cache
  apt:
    update_cache: yes
    cache_valid_time: 3600
  when: ansible_os_family == "Debian"

- name: Install essential packages
  package:
    name:
      - curl
      - wget
      - git
      - htop
      - vim
      - unzip
    state: present

- name: Create application user
  user:
    name: "{{ app_user }}"
    system: yes
    shell: /bin/bash
    home: "/home/{{ app_user }}"
    create_home: yes

- name: Set up SSH key for app user
  authorized_key:
    user: "{{ app_user }}"
    key: "{{ lookup('file', '~/.ssh/id_rsa.pub') }}"
    state: present

- name: Configure firewall
  ufw:
    rule: allow
    port: "{{ item }}"
    proto: tcp
  loop:
    - "22"
    - "80"
    - "443"
    - "3000"

- name: Enable firewall
  ufw:
    state: enabled
    policy: deny
```

**Nginx Role:**
```yaml
# roles/nginx/tasks/main.yml
---
- name: Install Nginx
  package:
    name: nginx
    state: present

- name: Start and enable Nginx
  systemd:
    name: nginx
    state: started
    enabled: yes

- name: Configure Nginx
  template:
    src: nginx.conf.j2
    dest: /etc/nginx/nginx.conf
    backup: yes
  notify: restart nginx

- name: Configure site
  template:
    src: site.conf.j2
    dest: /etc/nginx/sites-available/{{ app_name }}
  notify: restart nginx

- name: Enable site
  file:
    src: /etc/nginx/sites-available/{{ app_name }}
    dest: /etc/nginx/sites-enabled/{{ app_name }}
    state: link
  notify: restart nginx

- name: Remove default site
  file:
    path: /etc/nginx/sites-enabled/default
    state: absent
  notify: restart nginx
```

---

### Chapter 4: Containerization with Docker

#### **Docker Best Practices**

**Multi-Stage Dockerfile:**
```dockerfile
# Multi-stage build for Node.js application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Create app user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Set working directory
WORKDIR /app

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start application
CMD ["node", "dist/index.js"]
```

**Docker Compose for Development:**
```yaml
# docker-compose.yml
version: '3.8'

services:
  # Application
  app:
    build:
      context: .
      dockerfile: Dockerfile
      target: development
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://user:password@db:5432/myapp
      - REDIS_URL=redis://redis:6379
    volumes:
      - ./src:/app/src
      - ./node_modules:/app/node_modules
    depends_on:
      - db
      - redis
    networks:
      - app-network
    restart: unless-stopped

  # Database
  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    networks:
      - app-network
    restart: unless-stopped

  # Redis
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - app-network
    restart: unless-stopped

  # Nginx
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    networks:
      - app-network
    restart: unless-stopped

  # Monitoring
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    networks:
      - app-network
    restart: unless-stopped

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana_data:/var/lib/grafana
    networks:
      - app-network
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
  grafana_data:

networks:
  app-network:
    driver: bridge
```

**Docker Compose for Production:**
```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  # Application
  app:
    build:
      context: .
      dockerfile: Dockerfile
      target: production
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
    depends_on:
      - db
      - redis
    networks:
      - app-network
    restart: unless-stopped
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M

  # Database
  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=${POSTGRES_DB}
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network
    restart: unless-stopped
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M

  # Redis
  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    networks:
      - app-network
    restart: unless-stopped
    deploy:
      resources:
        limits:
          cpus: '0.25'
          memory: 256M
        reservations:
          cpus: '0.1'
          memory: 128M

  # Nginx
  nginx:
    image: nginx:alpine
    volumes:
      - ./nginx.prod.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    networks:
      - app-network
    restart: unless-stopped
    deploy:
      resources:
        limits:
          cpus: '0.25'
          memory: 256M
        reservations:
          cpus: '0.1'
          memory: 128M

volumes:
  postgres_data:
  redis_data:

networks:
  app-network:
    driver: bridge
```

---

### Chapter 5: Orchestration with Kubernetes

#### **Kubernetes Manifests**

**Deployment Configuration:**
```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  labels:
    app: web-app
    version: v1.0.0
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
        version: v1.0.0
    spec:
      containers:
      - name: web-app
        image: myapp:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: database-url
        - name: REDIS_URL
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: redis-url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
        volumeMounts:
        - name: app-config
          mountPath: /app/config
          readOnly: true
      volumes:
      - name: app-config
        configMap:
          name: app-config
      imagePullSecrets:
      - name: registry-secret
```

**Service Configuration:**
```yaml
# k8s/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: web-app-service
  labels:
    app: web-app
spec:
  selector:
    app: web-app
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: ClusterIP
```

**Ingress Configuration:**
```yaml
# k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-app-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/rate-limit: "100"
    nginx.ingress.kubernetes.io/rate-limit-window: "1m"
spec:
  tls:
  - hosts:
    - myapp.example.com
    secretName: myapp-tls
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: web-app-service
            port:
              number: 80
```

**ConfigMap and Secrets:**
```yaml
# k8s/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  app.properties: |
    server.port=3000
    server.host=0.0.0.0
    logging.level=INFO
    logging.format=json
  nginx.conf: |
    events {
        worker_connections 1024;
    }
    http {
        upstream app {
            server web-app-service:80;
        }
        server {
            listen 80;
            location / {
                proxy_pass http://app;
            }
        }
    }
---
# k8s/secrets.yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
type: Opaque
data:
  database-url: <base64-encoded-database-url>
  redis-url: <base64-encoded-redis-url>
  jwt-secret: <base64-encoded-jwt-secret>
```

**Horizontal Pod Autoscaler:**
```yaml
# k8s/hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web-app
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 10
        periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 60
      policies:
      - type: Percent
        value: 100
        periodSeconds: 60
```

---

*[Continue with remaining chapters...]*

---

## 🎙️ Podcast Episode: "DevOps Excellence with CURSOR IDE"

### **Episode Script Template**

**Opening (2 minutes):**
```
HOST: "Welcome to CURSOR-SKILLS, the podcast that helps developers master CURSOR IDE across all programming environments. I'm [Host Name], and today we're exploring DevOps excellence and how CURSOR IDE can transform your infrastructure and deployment workflow."

HOST: "DevOps has evolved from a simple concept of bringing development and operations together to a comprehensive culture and set of practices that enable organizations to deliver software faster, more reliably, and with higher quality. And CURSOR IDE brings unique advantages to DevOps that can significantly boost your productivity."

HOST: "Today, we'll cover everything from infrastructure as code and containerization to CI/CD pipelines and monitoring. Whether you're managing cloud infrastructure, deploying applications, or optimizing performance, this episode has something for you."
```

**Main Content (45 minutes):**
```
HOST: "Let's start with the fundamentals - infrastructure as code. This is where DevOps really begins, and understanding the patterns is essential for building scalable, maintainable infrastructure."

[Detailed explanation of Terraform, Ansible, CloudFormation]

HOST: "Now, let's talk about containerization. Docker has revolutionized how we package and deploy applications, and Kubernetes has become the standard for orchestration."

[Containerization patterns, Docker best practices, Kubernetes orchestration]

HOST: "CI/CD is another area where DevOps really shines. Let's explore GitHub Actions, GitLab CI, and Jenkins, and see how CURSOR IDE can help with each."

[CI/CD patterns, automation strategies, deployment pipelines]

HOST: "Monitoring and observability are crucial for maintaining production systems. Let's explore Prometheus, Grafana, and other monitoring tools."

[Monitoring strategies, observability patterns, alerting]

HOST: "Finally, let's talk about security and compliance. DevOps isn't just about speed - it's about delivering secure, compliant applications."

[Security best practices, compliance frameworks, vulnerability management]
```

**Closing (3 minutes):**
```
HOST: "That wraps up our deep dive into DevOps excellence with CURSOR IDE. The key takeaway is that DevOps is about more than just tools - it's about culture, collaboration, and continuous improvement."

HOST: "Next week, we'll be exploring Kubernetes in depth, so make sure to subscribe so you don't miss it. And don't forget to check out our CURSOR-SKILLS community for more DevOps resources and examples."

HOST: "Thanks for listening to CURSOR-SKILLS. Keep coding, keep learning, and I'll see you next week!"
```

---

## 📝 Blog Post: "Mastering DevOps with CURSOR IDE"

### **Blog Post Structure**

**Introduction:**
```markdown
# Mastering DevOps with CURSOR IDE

DevOps has evolved from a simple concept of bringing development and operations together to a comprehensive culture and set of practices that enable organizations to deliver software faster, more reliably, and with higher quality. In this comprehensive guide, we'll explore how CURSOR IDE can help you master modern DevOps practices and build exceptional infrastructure.

## What You'll Learn

- Infrastructure as Code with Terraform and Ansible
- Containerization with Docker and Kubernetes
- CI/CD pipelines and automation
- Monitoring and observability
- Security and compliance best practices
```

**Main Content:**
```markdown
## Infrastructure as Code

Infrastructure as Code (IaC) is the practice of managing and provisioning infrastructure through code. This approach brings version control, testing, and automation to infrastructure management.

### Terraform Configuration

```hcl
# main.tf
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# VPC Configuration
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "${var.project_name}-vpc"
    Environment = var.environment
  }
}

# Internet Gateway
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name        = "${var.project_name}-igw"
    Environment = var.environment
  }
}
```

### Ansible Configuration

```yaml
# playbooks/site.yml
---
- name: Configure all servers
  hosts: all
  become: yes
  roles:
    - common

- name: Configure web servers
  hosts: webservers
  become: yes
  roles:
    - nginx
    - nodejs

- name: Configure database servers
  hosts: databases
  become: yes
  roles:
    - postgresql
```

## Containerization with Docker

Docker has revolutionized how we package and deploy applications. Here are the key patterns:

### Multi-Stage Dockerfile

```dockerfile
# Multi-stage build for Node.js application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Create app user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Set working directory
WORKDIR /app

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start application
CMD ["node", "dist/index.js"]
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  # Application
  app:
    build:
      context: .
      dockerfile: Dockerfile
      target: development
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://user:password@db:5432/myapp
      - REDIS_URL=redis://redis:6379
    volumes:
      - ./src:/app/src
      - ./node_modules:/app/node_modules
    depends_on:
      - db
      - redis
    networks:
      - app-network
    restart: unless-stopped

  # Database
  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    networks:
      - app-network
    restart: unless-stopped
```

## Kubernetes Orchestration

Kubernetes has become the standard for container orchestration. Here are the key patterns:

### Deployment Configuration

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  labels:
    app: web-app
    version: v1.0.0
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
        version: v1.0.0
    spec:
      containers:
      - name: web-app
        image: myapp:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: database-url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
```

### Service and Ingress

```yaml
# k8s/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: web-app-service
  labels:
    app: web-app
spec:
  selector:
    app: web-app
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: ClusterIP

---
# k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-app-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  tls:
  - hosts:
    - myapp.example.com
    secretName: myapp-tls
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: web-app-service
            port:
              number: 80
```

## CI/CD Pipelines

Continuous Integration and Continuous Deployment are essential for modern software development:

### GitHub Actions

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

env:
  NODE_VERSION: '18'
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  # Lint and Test
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16, 18, 20]

    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Run linter
      run: npm run lint

    - name: Run tests
      run: npm run test:coverage

    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info

  # Security Scan
  security:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Run security audit
      run: npm audit --audit-level=moderate

    - name: Run Snyk security scan
      uses: snyk/actions/node@master
      env:
        SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

  # Build and Push Docker Image
  build:
    needs: [test, security]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v3

    - name: Log in to Container Registry
      uses: docker/login-action@v3
      with:
        registry: ${{ env.REGISTRY }}
        username: ${{ github.actor }}
        password: ${{ secrets.GITHUB_TOKEN }}

    - name: Extract metadata
      id: meta
      uses: docker/metadata-action@v5
      with:
        images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
        tags: |
          type=ref,event=branch
          type=sha,prefix={{branch}}-

    - name: Build and push Docker image
      uses: docker/build-push-action@v5
      with:
        context: .
        push: true
        tags: ${{ steps.meta.outputs.tags }}
        labels: ${{ steps.meta.outputs.labels }}

  # Deploy to Staging
  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    environment: staging

    steps:
    - name: Deploy to staging
      run: |
        echo "Deploying to staging environment"
        # Add your deployment commands here

  # Deploy to Production
  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment: production
    if: github.ref == 'refs/heads/main'

    steps:
    - name: Deploy to production
      run: |
        echo "Deploying to production environment"
        # Add your production deployment commands here
```

## Monitoring and Observability

Monitoring and observability are crucial for maintaining production systems:

### Prometheus Configuration

```yaml
# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "rules/*.yml"

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']

  - job_name: 'web-app'
    static_configs:
      - targets: ['web-app:3000']
    metrics_path: '/metrics'
    scrape_interval: 5s

  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
        action: replace
        target_label: __metrics_path__
        regex: (.+)
```

### Grafana Dashboard

```json
{
  "dashboard": {
    "id": null,
    "title": "Application Metrics",
    "tags": ["application", "monitoring"],
    "timezone": "browser",
    "panels": [
      {
        "id": 1,
        "title": "Request Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])",
            "legendFormat": "{{method}} {{endpoint}}"
          }
        ]
      },
      {
        "id": 2,
        "title": "Response Time",
        "type": "graph",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))",
            "legendFormat": "95th percentile"
          }
        ]
      }
    ]
  }
}
```

## Conclusion

DevOps with CURSOR IDE is about more than just tools - it's about culture, collaboration, and continuous improvement. By mastering infrastructure as code, containerization, orchestration, and monitoring, you'll be able to build and maintain scalable, reliable systems.

The key is to start with the fundamentals and gradually build up your skills. CURSOR IDE's AI-powered features can help you learn faster and write better code, but the foundation of good DevOps practices is essential.

## Next Steps

1. **Practice**: Build projects using the techniques covered
2. **Learn**: Explore advanced topics like service mesh and GitOps
3. **Contribute**: Share your knowledge with the community
4. **Stay Updated**: Follow the latest DevOps trends and best practices

## Resources

- [CURSOR-SKILLS Community](https://cursor-skills.com)
- [Terraform Documentation](https://www.terraform.io/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)

---

*This comprehensive guide provides the foundation for mastering DevOps with CURSOR IDE. The key is to practice regularly and stay updated with the latest techniques and best practices.*
```

---

This expanded content provides a complete foundation for creating professional, multi-format content that can be easily converted to audio for podcasts, used as blog posts, and developed into video tutorials, all while maintaining educational value and practical application.
