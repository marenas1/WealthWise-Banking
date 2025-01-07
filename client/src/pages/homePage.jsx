function homePage(){
    const token = localStorage.getItem("accessToken")

    return <><p>{token}</p>
    </>
}

export default homePage