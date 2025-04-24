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
                    docker run -d --name frontend -p 5173:5173 --env VITE_API_URL=http://localhost:5000 frontend
                    docker run -d -e MONGODB_URI=mongodb+srv://prince00:prince00@blog-ca-cluster.fw8jeut.mongodb.net/?retryWrites=true&w=majority&appName=blog-ca-cluster -e JWT_SECRET=Yv7XzRj8WqkGpS2f0B1tN9eL6UmD3cA5VhZrT4KyXjPuMfEdQqOiWcNsLaHgTbRy -e CLOUDINARY_CLOUD_NAME=drswwrvip -e CLOUDINARY_API_KEY=462654477487138 -e CLOUDINARY_API_SECRET=zexfWmEGzVEP_VEYkOYmBd4UTCs -e ACCESS_TOKEN_SECRET=ats -e ACCESS_TOKEN_EXPIRY=1d -e REFRESH_TOKEN_SECRET=rts -e REFRESH_TOKEN_EXPIRY=15d -e PORT=5000 --name backend -p 5000:5000 backend
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
