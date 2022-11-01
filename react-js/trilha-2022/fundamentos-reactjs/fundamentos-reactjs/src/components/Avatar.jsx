import styles from "./Avatar.module.css";


//Avatar com borda, por padrao é true, só aplica false quando explicitamente solicitado
export function Avatar({src, hasBorder = true}) {
  return (
    <img 
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      src={src}
    />
  );
}