import { Header } from "./components/Header";
import { Post } from "./components/Post";
import { Sidebar } from "./components/Sidebar";
import styles from "./App.module.css";
import "./global.css";

export function App() {
  
  return (
    <div className="App">
      <Header />
      
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <Post 
            author="Thiago Fernandes"
            content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est incidunt iure minima mollitia rem, id fuga corporis excepturi assumenda velit quidem nobis possimus dicta nesciunt porro doloremque architecto similique.."
          />
          <Post 
            author="Thiago Fernandes"
            content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est incidunt iure minima mollitia rem, id fuga corporis excepturi assumenda velit quidem nobis possimus dicta nesciunt porro doloremque architecto similique.."
          />
        </main>
      </div>
    </div>
  )
}


