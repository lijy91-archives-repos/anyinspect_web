pipeline {
  agent any
  environment {
    CODING_DOCKER_REG_HOST = "${CCI_CURRENT_TEAM}-docker.pkg.${CCI_CURRENT_DOMAIN}"
    CODING_DOCKER_IMAGE_NAME = "${PROJECT_NAME.toLowerCase()}/${DOCKER_REPO_NAME}/${DOCKER_IMAGE_NAME}"
  }
  stages {
    stage("检出") {
      steps {
        checkout(
          [$class: 'GitSCM',
            branches: [
              [name: GIT_BUILD_REF]
            ],
            userRemoteConfigs: [
              [
                url: GIT_REPO_URL,
                credentialsId: CREDENTIALS_ID
              ]
            ]
          ]
        )
      }
    }

    stage('构建镜像并推送到 CODING Docker 制品库') {
      steps {
        script {
          docker.withRegistry(
            "${CCI_CURRENT_WEB_PROTOCOL}://${CODING_DOCKER_REG_HOST}",
            "${CODING_ARTIFACTS_CREDENTIALS_ID}"
          ) {
            def dockerImage = docker.build("${CODING_DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_VERSION}", "-f ${DOCKERFILE_PATH} ${DOCKER_BUILD_CONTEXT}")
            dockerImage.push()
          }
        }
      }
    }

    stage('部署到远端服务') {
      steps {
        script {
          def remoteConfig = [: ]
          remoteConfig.name = "my-remote-server"
          remoteConfig.host = "${REMOTE_HOST}"
          remoteConfig.port = "${REMOTE_SSH_PORT}".toInteger()
          remoteConfig.allowAnyHosts = true

          withCredentials([
            sshUserPrivateKey(
              credentialsId: "${REMOTE_CRED}",
              keyFileVariable: "privateKeyFilePath"
            ),
            usernamePassword(
              credentialsId: "${CODING_ARTIFACTS_CREDENTIALS_ID}",
              usernameVariable: 'CODING_DOCKER_REG_USERNAME',
              passwordVariable: 'CODING_DOCKER_REG_PASSWORD'
            )
          ]) {
            // SSH 登陆用户名
            remoteConfig.user = "${REMOTE_USER_NAME}"
            // SSH 私钥文件地址
            remoteConfig.identityFile = privateKeyFilePath

            // 请确保远端环境中有 Docker 环境
            sshCommand(
              remote: remoteConfig,
              command: "docker login -u ${CODING_DOCKER_REG_USERNAME} -p ${CODING_DOCKER_REG_PASSWORD} ${CODING_DOCKER_REG_HOST}",
              sudo: true,
            )

            def imageName = "${env.CODING_DOCKER_REG_HOST}/${env.CODING_DOCKER_IMAGE_NAME}:${env.GIT_LOCAL_BRANCH}-${env.GIT_COMMIT}";
            def imageAlias = "${env.DOCKER_IMAGE_NAME}"

            // SSH 登录到服务器，拉取 Docker 镜像
            sshCommand(
              remote: remoteConfig,
              command: "docker pull ${imageName}",
              sudo: true,
            )
            sshCommand(
              remote: remoteConfig,
              command: "docker stop ${imageAlias} | true",
              sudo: true,
            )
            sshCommand(
              remote: remoteConfig,
              command: "docker rm ${imageAlias} | true",
              sudo: true,
            )
            sshCommand(
              remote: remoteConfig,
              command: """docker run \
                -p ${DOCKER_APP_EXPOSE_PORT}:3000 \
                -e VIRTUAL_HOST=${DOCKER_APP_VIRTUAL_HOST} \
                --name ${imageAlias} -d ${imageName} \
              """,
              sudo: true,
            )

            echo "部署成功，请到 http://${DOCKER_APP_VIRTUAL_HOST} 预览效果"
          }
        }
      }
    }
  }
}