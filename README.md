# Run docker-compose
Docker Desktop must be installed on your machine. You can download and install it from the official Docker page.
# Install 

Ensure you have admin rights to execute commands in the terminal.

## Project Structure
- Below is the structure that your project should have before running the Docker containers:
root-of-project/
│
├── e-sport-arena/
│   └── Dockerfile
│
├── docker-compose.yml
└── .env

# Steps to Run the Docker Orchestration
1. Verify Docker Desktop
Before starting, make sure Docker Desktop is running on your machine.

You can check this by running the following command in your terminal to confirm Docker is installed and running:


```bash
docker --version

```

2. Navigate to the Correct Folder
Make sure you are in the root directory that contains the full project structure mentioned above, i.e., 

```bash
cd path/to/root-of-project

```

3. Run Docker Compose
Once you're in the correct folder, use the following command to build and run the containers:

```bash
docker-compose up --build -d

```