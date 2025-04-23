pipeline {
    agent any

    environment {
        REGISTRY = "your-docker-registry" // e.g. docker.io/yourusername
        BACKEND_IMAGE = "${REGISTRY}/my-backend-image:latest"
        FRONTEND_IMAGE = "${REGISTRY}/my-frontend-image:latest"
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
                    sh "docker build -t ${BACKEND_IMAGE} ."
                }
                dir('Frontend') {
                    sh "docker build -t ${FRONTEND_IMAGE} ."
                }
            }
        }

        stage('Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-registry-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin ${REGISTRY}'
                    sh "docker push ${BACKEND_IMAGE}"
                    sh "docker push ${FRONTEND_IMAGE}"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Stop and remove existing containers if they exist
                    sh 'docker rm -f backend-container || true'
                    sh 'docker rm -f frontend-container || true'

                    // Run backend container on port 3000
                    sh "docker run -d --name backend-container -p 3000:3000 ${BACKEND_IMAGE}"

                    // Run frontend container on port 3001
                    sh "docker run -d --name frontend-container -p 3001:3000 ${FRONTEND_IMAGE}"
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Build, push, and deploy successful.'
        }
        failure {
            echo 'Build, push, or deploy failed.'
        }
    }
}
