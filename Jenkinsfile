pipeline {
    agent any

    environment {
        IMAGE_NAME = "my-app-image:latest"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                dir('Backend') {
                    bat "docker build -t ${IMAGE_NAME} ."
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    bat 'docker rm -f my-app-container || true'
                    bat "docker run -d --name my-app-container -p 3000:3000 ${IMAGE_NAME}"
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
