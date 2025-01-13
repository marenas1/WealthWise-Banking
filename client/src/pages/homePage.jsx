function homePage(){
    const token = sessionStorage.getItem("accessToken")

    return <><p>{token}</p>
    </>
}

export default homePage