function FalseToken(){
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
return(
    <>
    {usuario}
    </>
)
}

export default FalseToken;