import React, {useState, useEffect} from 'react'

import "./RepoInfo.css"


function RepoInfo({user, repository}) {
    const [repo, setRepo] = useState({})

    useEffect(() => {
        async function fetchRepositoryHandler() {
            if (user === undefined || repository === undefined) {
                return
            }

            const response = await fetch(`https://api.github.com/repos/${user}/${repository}`, {
                method: "GET",
                headers: {
                    Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
                }
            })
            const data = await response.json()
            // data.updated_at = new Intl.DateTimeFormat('pt-BR').format(new Date(data.updated_at))
            // console.log(data.organization?.avatar_url)
            setRepo(data)
        }
        fetchRepositoryHandler()
    }, [user, repository])


    return (
        <tr>
            <td>
                <a href={repo.html_url} target="_blank" rel="noreferrer">
                    {repo.organization?.avatar_url ? <img src={repo.organization?.avatar_url} alt={repo.full_name} width="32" /> : <img src="https://via.placeholder.com/32x32" alt={repo.full_name} width="32" />}
                </a>
                <a href={repo.html_url} target="_blank" rel="noreferrer">
                    {repo.full_name}
                </a>
            </td>
            <td>
                {repo.description}
            </td>
            <td>
                {repo.language}
            </td>
            <td className="text-center">
                {repo.stargazers_count}
            </td>
            <td className="text-center">
                {repo.watchers_count}
            </td>
            <td className="text-center">
                {repo.updated_at}
            </td>
        </tr>
    )
}

export default RepoInfo