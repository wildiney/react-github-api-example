import React, {useState, useEffect} from 'react'
import RepoInfo from './RepoInfo'

function Repositories() {
    const [repositories, setRepositories] = useState([])

    useEffect(() => {
        async function fetchRepositoriesHandler() {
            const response = await fetch(`https://potion-api.vercel.app/table?id=${process.env.REACT_APP_TABLE_ID}`)
            const data = await response.json()
            const repositoryData = data.map((repoData) => {
                return {
                    id: repoData.id,
                    user: repoData.fields.User,
                    repository: repoData.fields.Repository
                }
            })
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
                        <th>Languages</th>
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