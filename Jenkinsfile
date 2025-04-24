pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = "my-frontend-image:latest"
        BACKEND_IMAGE = "my-backend-image:latest"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    bat "docker build -t ${FRONTEND_IMAGE} ."
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    bat "docker build -t ${BACKEND_IMAGE} ."
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Stop old containers if they exist
                    bat 'docker rm -f frontend-container || true'
                    bat 'docker rm -f backend-container || true'

                    // Create Docker network if not already present
                    bat 'docker network create app-net || true'

                    // Run new containers with appropriate port mappings
                    bat "docker run -d --name backend-container --network app-net -p 8001:80 %BACKEND_IMAGE%"
                    bat "docker run -d --name frontend-container --network app-net -p 5001:5000 %FRONTEND_IMAGE%"
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Build and deploy successful.'
        }
        failure {
            echo 'Build or deploy failed.'
        }
    }
}
