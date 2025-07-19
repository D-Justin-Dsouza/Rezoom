# Rezoom: The Dynamic Resume Generator  

Rezoom is a fun project built by students to make creating resumes super easy and hassle-free. It combines a clean design with a solid backend to help users quickly build professional resumes and download them as PDFs.  
This project was created during a hackathon to learn backend development in Go while using a modern frontend stack like Next.js and Tailwind CSS.  

## ✨ Features  
- **Secure User Authentication**: Create an account, log in, and manage sessions securely with JWT-based authentication.  
- **Dynamic Resume Builder**: A simple interface lets users fill out all the important resume sections:  
    - Personal Info  
    - Professional Summary  
    - Work Experience  
    - Education  
    - Skills  
    - Projects  
- **Live Preview**: Watch your resume update in real-time as you type.  
- **CRUD Functionality**: Create, Read, Update, and Delete resumes easily.  
- **PDF Downloads**: Download a high-quality PDF of your resume with one click.  
- **Modern UI**: Built with Tailwind CSS and Shadcn/ui for a clean and responsive look.  

## 🛠️ Tech Stack  
This is a full-stack app with separate frontend and backend.  

### Backend:  
- **Language**: Go  
- **Framework**: Gin  
- **Database**: SQLite  
- **Authentication**: bcrypt for passwords, jwt-go for tokens  

### Frontend:  
- **Framework**: Next.js  
- **Language**: TypeScript  
- **Styling**: Tailwind CSS  
- **PDF Tools**: jspdf & html2canvas  

## 🏁 Getting Started  
Here’s how you can set it up locally:  

### Prerequisites  
- Go (v1.18 or higher)  
- Node.js  

### Installation  
1. Clone the repo:  
    ```bash  
    git clone https://github.com/D-Justin-Dsouza/Rezoom.git 
    cd rezoom  
    ```  

2. Backend setup:  
    - Go to the server folder:  
        ```bash  
        cd server  
        ```  
    - Install dependencies:  
        ```bash  
        go mod tidy  
        ```  

3. Frontend setup:  
    - Go to the frontend folder:  
        ```bash  
        cd ../frontend  
        ```  
    - Install npm packages:  
        ```bash  
        npm install  
        ```  

### Running the App  
Use two terminals:  

- **Terminal 1**: Start the Backend  
    ```bash  
    cd server  
    go run .  
    ```  
    Backend runs at `http://localhost:8080`.  

- **Terminal 2**: Start the Frontend  
    ```bash  
    cd frontend  
    npm run dev  
    ```  
    Frontend runs at `http://localhost:3000`.  

## 📚 Documentation  

### API Endpoints  
The backend has these endpoints:  

#### Authentication  
- **POST /api/register**: Register a user.  
- **POST /api/login**: Log in a user.  
- **GET /api/logout**: Log out.  

#### Resume Management  
- **GET /api/resumes**: Get all resumes.  
- **POST /api/resumes**: Create a resume.  
- **PUT /api/resumes/:id**: Update a resume.  
- **DELETE /api/resumes/:id**: Delete a resume.  

### Frontend Routes  
The frontend has these pages:  
- **/**: Landing page  
- **/dashboard**: User dashboard  
- **/builder**: Resume builder  
- **/login**: Login page  
- **/register**: Registration page  

## 🤝 Contributing  

Contributions are welcome!  
1. Fork the repo.  
2. Create a branch (`git checkout -b feature-name`).  
3. Commit changes (`git commit -m "Add feature"`).  
4. Push the branch (`git push origin feature-name`).  
5. Open a pull request.  

Make sure your code follows the standards and includes tests.  
