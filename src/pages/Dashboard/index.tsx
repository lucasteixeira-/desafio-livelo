import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import { Title, Form, Error, Repositories } from './styles';

interface User {
    login: string;
    name: string;
    avatar_url: string;
    bio: string;
}

const Dashboard: React.FC = () => {
    
    const [userName, setUserName] = useState('');
    const [inputError, setInputError] = useState('');
    const [usersList, setUsersList] = useState<User[]>(() => {
        const storageUsers = localStorage.getItem(
          '@GithubSearch:user',
        );
    
        if (storageUsers) {
          return JSON.parse(storageUsers);
        }
    
        return [];
    });
    
    useEffect(() => {
        localStorage.setItem(
            '@GithubSearch:user',
            JSON.stringify(usersList),
        );
    }, [usersList]);

    async function handleAddRepository(e: FormEvent<HTMLFormElement>,): Promise<void> {
        e.preventDefault();

        if (!userName) {
            setInputError('Por favor, informe o login do usuário');
            return;
        }

        try {
            const response = await api.get<User>(`/users/${userName}`);

            const user = response.data;

            setUsersList([...usersList, user]);
            setUserName('');
            setInputError('');
        } catch (err) {
            setInputError('Erro na busca por este usuário');
        }
    }


    return (
        <>
            <Title>Busca de usuários do Github</Title>

            <Form hasError={!!inputError} onSubmit={handleAddRepository}>
                <input
                value={userName}
                onChange={e => setUserName(e.target.value)}
                placeholder="Digite o login do usuário"
                />
                <button type="submit">Pesquisar</button>
            </Form>

            {inputError && <Error>{inputError}</Error>}

            <Repositories>
                {usersList.map(user => (
                    <Link key={user.login} to={`/${user.login}`}>
                        <img
                        src={user.avatar_url}
                        alt={user.name}
                        />
                        <div>
                        <strong>{user.name}</strong>
                        <p>{user.bio}</p>
                        </div>

                        <FiChevronRight size={20} />
                    </Link>
                ))}

                
            </Repositories>
        </>    
    )
}

export default Dashboard;