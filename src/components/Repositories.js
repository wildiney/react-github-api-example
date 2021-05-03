import React, {useState, useEffect} from 'react'
import RepoInfo from './RepoInfo'
import env from "react-dotenv";


function Repositories() {
    const [repositories, setRepositories] = useState([])

    useEffect(() => {
        async function fetchRepositoriesHandler() {
            const response = await fetch(`https://potion-api.vercel.app/table?id=${env.TABLE_ID}`)
            const data = await response.json()
            const repositoryData = data.map((repoData) => {
                return {
                    id: repoData.id,
                    user: repoData.fields.User,
                    repository: repoData.fields.Repository
                }
            })
            console.log(repositoryData)
            setRepositories(repositoryData)
        }
        fetchRepositoriesHandler()
    }, [])

    return (
        <React.Fragment>
            <h1>Github Repositories</h1>
            <table>
                <thead>
                    <tr>
                        <th>Repository</th>
                        <th>Description</th>
                        <th>Language</th>
                        <th>Stars</th>
                        <th>Watch</th>
                        <th>Last update</th>
                    </tr>
                </thead>
                <tbody>
                    {repositories.map((repo, index) => {
                        return repo.user && repo.repository && <RepoInfo key={repo.id} user={repo.user} repository={repo.repository}></RepoInfo>
                    })}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default Repositories