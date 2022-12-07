import { useEffect, useState } from "react"
import { getExams } from "../services/exams"

const examData = () => {
    const [dataExam, setDataExam] = useState()

    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        try {
           const data = await getExams()
           setDataExam(data.data)
        } catch (error) {
            console.log(error)
        }
    }
    return dataExam
}

export default examData