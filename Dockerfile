# Stage 1: Build the Node.js app
FROM ubuntu:noble
RUN apt update && apt install -y curl && \
    curl -sL https://deb.nodesource.com/setup_22.x | bash - && \
    apt install -y nodejs

# Set the custom path for Playwright's browser installation
ENV PLAYWRIGHT_BROWSERS_PATH=/home/pwuser/pw-browsers

# Create a non-root user
RUN useradd -m pwuser

RUN npm install --global yarn playwright
RUN playwright install --with-deps chromium-headless-shell

WORKDIR /app
COPY . .
RUN yarn install
RUN yarn tsc

# RUN chown -R pwuser:pwuser /app

# Switch to the non-root user
USER pwuser

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/index.js"]
