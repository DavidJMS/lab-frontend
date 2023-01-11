import { useEffect, useState } from "react"
import { getClients } from "../services/clients"

const userData = () => {
    const [dataUser, setDataUser] = useState()

    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        try {
            const data = await getClients()
            setDataUser(data)
        } catch (error) {
            console.log(error)
        }
    }
}
return dataUser

export default userData