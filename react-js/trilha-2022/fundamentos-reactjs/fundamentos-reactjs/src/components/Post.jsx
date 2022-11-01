import { Comment } from "./Comment";
import { Avatar } from "./Avatar";
import styles from "./Post.module.css";

import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useState } from "react";

export function Post({ author, content, publishedAt }) {

  const [comments, setComments] = useState(["Post muito maneiro, hein!"]);
  const [newComment, setNewComment] = useState("");

  const dateFormated = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR
  })

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  })

  function handleCreateNewComment(ev) {
    ev.preventDefault();
    //consigo acessar meu input pelo seu nome atraves do target
    //console.log(event.target.comment)
    setComments([...comments, newComment]);
    setNewComment("");
  }

  function handleNewCommentChange() {
    setNewComment(event.target.value)
  }

  function deleteComment(commentToDelete) {
    const commentsWithoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete;
    })

    setComments(commentsWithoutDeletedOne);
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar
            src={author.avatarUrl}
          />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time 
          title={dateFormated}
          dateTime={publishedAt.toISOString()}>
            {dateFormated}
          </time>
      </header>
      <div className={styles.content}>
        {
          content.map(item => {
            if(item.type === "paragraph") {
              return <p key={item.content}>{item.content}</p>
            } else if(item.type === "link") {
              return <p key={item.content}><a href="#">{item.content}</a></p>
            }
          })
        }
        <p>Fala galeraa 👋</p>

        <p>Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀</p>

        <p>👉{" "}<a href="">jane.design/doctorcare</a></p>
      </div>

      <form 
        onSubmit={handleCreateNewComment}
        className={styles.commentForm}>
        <strong>Deixe seu Feedback</strong>
        <textarea
          name="comment"
          value={newComment}
          onChange={handleNewCommentChange}
          placeholder="Deixe seu comentário"
        />
        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {
          comments.map(comment => {
            return (
              <Comment 
                content={comment} 
                key={comment} 
                onDeleteComment={deleteComment}
              />
            )
          })
        }
      </div>
    </article>
  )
}