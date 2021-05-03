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
            let data = await response.json()
            data["languages"] = await fetchLanguages(data.languages_url)
            data["abbr"] = data["full_name"].substr(0, 1)
            setRepo(data)
        }
        fetchRepositoryHandler()
    }, [user, repository])

    async function fetchLanguages(url) {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
        })
        const data = await response.json()
        return Object.keys(data).join(", ")
    }

    function setDate(dateTime) {
        const newDate = new Date(dateTime).toLocaleString('pt-BR')
        return newDate
    }

    return (
        <tr>
            <td>
                <a href={repo.html_url} target="_blank" rel="noreferrer">
                    {repo.organization?.avatar_url ? <img src={repo.organization?.avatar_url} alt={repo.full_name} width="32" /> : <img src={`https://via.placeholder.com/32x32.png?text=${repo.abbr}`} alt={repo.full_name} width="32" />}
                </a>
                <a href={repo.html_url} target="_blank" rel="noreferrer">
                    {repo.full_name}
                </a>
            </td>
            <td>
                {repo.description}
            </td>
            <td>
                {repo.languages}
            </td>
            <td className="text-center">
                {repo.stargazers_count}
            </td>
            <td className="text-center">
                {repo.subscribers_count}
            </td>
            <td className="text-center">
                {setDate(repo.updated_at)}
            </td>
        </tr>
    )
}

export default RepoInfo