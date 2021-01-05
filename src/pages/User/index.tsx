import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Header, UserInfo, Repository, Error, Loading } from './styles';

interface GithubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  followers: number;
  following: number;
  repos_url: string;
  starred_url: string;
}

const User: React.FC = () => {
  const [item, setItem] = useState<GithubUser | null>(null);
  const [showRepos, setShowRepos] = useState(false);
  const [showStarred, setShowStarred] = useState(false);
  const [repos, setRepos] = useState<any[]>([]);
  const [starred, setStarred] = useState<any[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [loadingStarred, setLoadingStarred] = useState(false);
  
  const { user } = useParams();

  const setUserToDisplay = () => {
    const usersObject = JSON.parse(localStorage.getItem('@GithubSearch:user')!);
    const finalUser = usersObject.filter((storageUser: { login: any; }) => storageUser.login === user);

    if(!finalUser)
      return;

    setItem(finalUser[0]);
  }

  const handleShowRepos = () => {
    setLoadingRepos(true);
    setShowRepos(true);
    setShowStarred(false);

    api.get(`/users/${user}/repos`)
    .then((response) => {
      setRepos(response.data);
      setLoadingRepos(false);
    })
  }
  
  const handleShowStarred = () => {
    setLoadingStarred(true);
    setShowRepos(false);
    setShowStarred(true);

    api.get(`/users/${user}/starred`)
    .then((response) => {
      setStarred(response.data);
      setLoadingStarred(false);
    })
  }
  
  useEffect(() => {
    setUserToDisplay();
  }, []);


  return (
    <>
      <Header>
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      {item ? (
        <>
          <UserInfo>
            <header>
              <img
                src={item.avatar_url}
                alt={item.login}
              />
              <div>
                <strong>{item.name}</strong>
                <p>{item.bio}</p>
              </div>
            </header>
            <ul>
              <li>
                <strong>{item.followers}</strong>
                <span>Seguidores</span>
              </li>
              <li>
                <strong>{item.following}</strong>
                <span>Seguindo</span>
              </li>
            </ul>
            <button onClick={handleShowRepos}>Repos</button>
            <button onClick={handleShowStarred}>Starred</button>
          </UserInfo>

          {loadingRepos ? 
            <Loading>Carregando...</Loading>
            : 
            
            showRepos && repos.length ? 
          
            repos.map(repository => (
              <Repository>
                <a target="_blank" href={repository.html_url}><strong>{repository.name}</strong></a>
                <p>{repository.description}</p>
              </Repository>
            ))
            
            : 
          
            showRepos && (
              <Error>
                Este usuário não possui nenhum repositório
              </Error>
            )
          }

          {loadingStarred ?
            <Loading>Carregando...</Loading>
            :
            
            showStarred && starred.length ? 
          
            starred.map(repository => (
              <Repository>
                <a target="_blank" href={repository.html_url}><strong>{repository.name}</strong></a>
                <p>{repository.description}</p>
              </Repository>
            ))
            
            : 
          
            showStarred && (
              <Error>
                Nenhum repositório visitado por este usuário
              </Error>
            )
          
          }


        </>
      ) : 
      <div>
        <strong>Erro</strong>
        <p>Usuário não encontrado em nossos registros</p>
      </div>
      }

    </>
  );
};


export default User;