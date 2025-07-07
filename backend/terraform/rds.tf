resource "aws_security_group" "rds_sg" {
  name        = "fanjam-rds-sg"
  description = "Allow PostgreSQL access"

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # TEMP: Replace with EC2 public IP or VPC later
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_db_instance" "postgres" {
  identifier         = "fanjam-db"
  allocated_storage  = 20
  engine             = "postgres"
  engine_version     = "15"
  instance_class     = "db.t3.micro"
  db_name            = "fanjamdb"
  username           = var.db_username
  password           = var.db_password
  publicly_accessible = true
  skip_final_snapshot = true
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
}
