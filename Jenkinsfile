pipeline {
    agent any

    stages {
        stage('Docker Cleanup') {
            steps {
                bat '''
                    docker stop frontend || echo Frontend container not running
                    docker rm frontend || echo No frontend container to remove
                    docker rmi -f frontend || echo No frontend image to remove

                    docker stop backend || echo Backend container not running
                    docker rm backend || echo No backend container to remove
                    docker rmi -f backend || echo No backend image to remove
                '''
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    bat 'docker build -t frontend .'
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    bat 'docker build -t backend .'
                }
            }
        }

        stage('Run Containers') {
            steps {
                bat '''
                    docker run -d -p 5000:5173 --name frontend frontend
                    docker run -d -p 3000:5000 --name backend backend
                '''
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat '''
                        echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                        
                        docker tag frontend %DOCKER_USER%/frontend:latest
                        docker tag backend %DOCKER_USER%/backend:latest

                        docker push %DOCKER_USER%/frontend:latest
                        docker push %DOCKER_USER%/backend:latest
                    '''
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Frontend and backend built, deployed, and pushed successfully.'
        }
        failure {
            echo 'One or more pipeline steps failed.'
        }
    }
}
