pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "my-backend-image:latest"
        FRONTEND_IMAGE = "my-frontend-image:latest"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    dir('Backend') {
                        sh 'docker build -t $BACKEND_IMAGE .'
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    dir('Frontend') {
                        sh 'docker build -t $FRONTEND_IMAGE .'
                    }
                }
            }
        }

        // Add additional stages like Test, Push, Deploy as needed
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
    }
}
