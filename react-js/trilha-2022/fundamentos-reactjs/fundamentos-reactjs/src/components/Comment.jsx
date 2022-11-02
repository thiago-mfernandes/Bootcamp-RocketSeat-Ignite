import { ThumbsUp, Trash } from "phosphor-react";
import { Avatar } from "./Avatar";
import styles from "./Comment.module.css";
import { useState } from 'react';

export function Comment({content, onDeleteComment}) {

  const [likeCount, setLikeCount] = useState(0);

  function handleDeleteComment() {
    onDeleteComment(content)
  }

  function handleLikeComment() {
    //para atualizar o valor de likes, preciso do valor anterior de likes
    setLikeCount((oldState) => {
      return oldState + 1;
    })
  }

  return (
    <div className={styles.comment}>
      <Avatar src="https://avatars.githubusercontent.com/u/91342038?v=4" hasBorder={false}/>

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>

            <div className={styles.authorAndTime}>
              <strong>Thiago Fernandes</strong>
              <time title="11 de Maio às 08:13" dateTime="2022-05-11 08:13:13">Cerca de 1h atrás</time>
            </div>

            <button title="Deleter comentário" onClick={handleDeleteComment}>
              <Trash size={24}/>
            </button>

          </header>
          <p>{content} 👏👏</p>
        </div>


        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}