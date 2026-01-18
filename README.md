# 🌍 ClimaLens

ClimaLens is an interactive climate data visualization web app built with React and Vite. It helps users explore climate trends through charts and dynamic visuals by fetching and displaying environmental data. You can try a live version here: https://climalens-noemimolino.netlify.app/

---

## 🚀 Features

- **Climate Data Visualization**: Displays climate-related data through responsive and interactive charts built with Recharts.
- **Component-Based Architecture**: Developed using reusable React components for a clean, modular, and maintainable codebase.
- **API Integration**: Fetches climate data from external APIs using Axios and handles asynchronous data flows efficiently.
- **Client-Side Routing**: Implements navigation between views using React Router DOM, enabling a smooth single-page application experience.
- **Modern Development Stack**: Built with React and Vite for fast development, hot module replacement, and optimized production builds.
- **Styling**: Styled with Sass (SCSS) for better organization, scalability, and maintainability of stylesheets.

---

## 🛠️ Technologies Used

- **Vite**: A fast and lightweight build tool that provides an extremely rapid development experience and optimized production builds.
- **React** : A JavaScript library for building reusable, component-based user interfaces.
- **Sass**: A CSS preprocessor that extends CSS with variables, nesting, mixins, and functions for better style organization.
- **React Router DOM**: Enables client-side routing and navigation using components such as <Routes>, <Route>, and hooks like useNavigate and useSearchParams.
- **Axios**: A promise-based HTTP client used to fetch data from external APIs and handle asynchronous requests.
- **Prop-Types**: Provides runtime type checking for React component props, helping to catch bugs and improve code reliability.
- **Recharts**: A charting library built on top of React and D3, used to create responsive and interactive data visualizations.
- **Lucide React**: A modern, customizable icon library for React applications.
- **Netlify**: Used for deployment and hosting, including support for serverless functions and continuous deployment.

---

## 📌 Demo

👉 Live Demo: https://climalens-noemimolino.netlify.app/

---

## 🗂 Project Structure

Below is the main structure of this repository:

climalens/
├── netlify/                   # Netlify functions and configs
│   └── functions/
├── src/                       # Source code
│   ├── api/                   # API calls and data fetching logic
│   ├── components/            # React components
│   ├── pages/                 # Page views / routes
│   ├── styles/                # SCSS / styling
│   ├── App.jsx                # Root app component
│   └── main.jsx               # Entry point
├── index.html                 # Main HTML file
├── package.json               # Project metadata & dependencies
├── vite.config.js             # Vite config
└── netlify.toml               # Netlify deploy config

---

## 🧠 Installation

1. Clone the repository
    git clone https://github.com/noemolino/climalens.git

2. Navigate to the project directory:
    cd climalens

3. Install dependencies
    npm install

### Running the Project
Start the development server:
    sh
    npm run dev
Open your browser and navigate to http://localhost:5173 (or the URL provided in your terminal).

---

## 📄 License

Your project doesn’t list a license — add one if you want open-source usage terms. For example MIT License.