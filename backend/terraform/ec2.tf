resource "aws_key_pair" "fanjam_key" {
  key_name   = "fanjam-keypair"
  public_key = file("~/.ssh/id_rsa.pub")
}

resource "aws_security_group" "ec2_sg" {
  name        = "fanjam-ec2-sg"
  description = "Allow SSH and app port"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["87.248.108.118/32"]
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_iam_role" "ssm_role" {
  name = "fanjam-ec2-ssm-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Principal = {
        Service = "ec2.amazonaws.com"
      },
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "ssm_core" {
  role       = aws_iam_role.ssm_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_instance_profile" "ssm_instance_profile" {
  name = "fanjam-ec2-profile"
  role = aws_iam_role.ssm_role.name
}

resource "aws_instance" "backend" {
  ami                         = "ami-021d9f8e43481e7da"
  instance_type               = "t2.micro"
  key_name                    = aws_key_pair.fanjam_key.key_name
  vpc_security_group_ids      = [aws_security_group.ec2_sg.id]
  iam_instance_profile        = aws_iam_instance_profile.ssm_instance_profile.name

  user_data = <<-EOF
              #!/bin/bash
              apt update -y
              apt install -y docker.io
              systemctl start docker
              docker login -u AWS -p $(aws ecr get-login-password --region eu-west-1) 870964588993.dkr.ecr.eu-west-1.amazonaws.com
              docker run -d --name fanjam-backend \
                -e SPRING_DATASOURCE_URL=jdbc:postgresql://${aws_db_instance.postgres.address}:5432/fanjamdb \
                -e SPRING_DATASOURCE_USERNAME=${var.db_username} \
                -e SPRING_DATASOURCE_PASSWORD=${var.db_password} \
                -e SPRING_JPA_HIBERNATE_DDL_AUTO=update \
                -p 8080:8080 \
                870964588993.dkr.ecr.eu-west-1.amazonaws.com/fanjam-backend
              EOF

  tags = {
    Name        = "fanjam-backend"
    Environment = "prod"
  }
}
