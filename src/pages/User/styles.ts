import styled from 'styled-components';
import { shade } from 'polished';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #a8a8b3;
    transition: color 0.2s;
    &:hover {
      color: #666;
    }
    svg {
      margin-right: 4px;
    }
  }
`;

export const UserInfo = styled.section`
  margin-top: 50px;
  header {
    display: flex;
    align-items: center;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    div {
      margin-left: 24px;
      strong {
        font-size: 36px;
        color: #3d3d4d;
      }
      p {
        font-size: 18px;
        color: #737380;
        margin-top: 4px;
      }
    }
  }
  ul {
    display: flex;
    list-style: none;
    margin-top: 30px;
    li {
      & + li {
        margin-left: 80px;
      }
      strong {
        display: block;
        font-size: 24px;
        color: #3d3d4d;
      }
      span {
        display: block;
        margin-top: 4px;
        color: #6c6c80;
      }
    }
  }

  button {
    width: 150px;
    height: 30px;
    margin-top: 10px;
    background: #04d361;
    border-radius: 0 5px 5px 0;
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;
    &:hover {
        background: ${shade(0.2, '#04d361')};
    }
  }

  button + button {
    margin-left: 10px;
  }
`;

export const Repository = styled.div`
  margin-top: 50px;
  max-width: 700px;
  background-color: #fff;
  border-radius: 5px;
  width: 100%;
  padding: 24px;
  display: block;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: left;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateX(10px);
  }

  a {
    text-decoration: none;
  }

  img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
  }

  
  strong {
    flex: 1;
    font-size: 20px;
    color: #3d3d4d;
  }

  p {
    flex: 1;
    font-size: 18px;
    color: #a8a8b3;
    margin-top: 4px;
  }
  
`;

export const Error = styled.div`
  margin-top: 50px;
  max-width: 700px;
  background-color: #fff;
  border-radius: 5px;
  width: 100%;
  padding: 24px;
  display: block;
  color: #fafafa;
  background-color: #f94343;
`;

export const Loading = styled.div`
  margin-top: 50px;
  max-width: 700px;
  background-color: #fff;
  border-radius: 5px;
  width: 100%;
  padding: 24px;
  display: block;
  color: #fafafa;
  background-color: #3d3d4d;
`;