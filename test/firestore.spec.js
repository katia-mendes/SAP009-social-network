import {
  doc,
  deleteDoc,
  addDoc,
  collection,
  updateDoc,
  query,
  orderBy,
  getDocs,
} from 'firebase/firestore';

import { getAuth } from 'firebase/auth';

import {
  salvarPost,
  pegarPost,
  deletarPost,
  editarPosts,
} from '../src/firebase/firestore';

jest.mock('firebase/firestore');
jest.mock('firebase/auth');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('salvarPost', () => {
  it('should be a function', () => {
    expect(typeof salvarPost).toBe('function');
  });

  it('deve criar um post e guardar na coleção', async () => {
    addDoc.mockResolvedValueOnce();
    const mockCollection = 'collection';
    collection.mockReturnValueOnce(mockCollection);
    const mockAuth = {
      currentUser: {
        displayName: 'username',
        uid: 'iduser',
      },
    };
    getAuth.mockReturnValueOnce(mockAuth);

    const dataPost = new Date();
    const textArea = 'txt-area';
    const userName = 'nome e sobrenome'
    const posts = {
      userId: mockAuth.currentUser.displayName,
      date: dataPost,
      id: mockAuth.currentUser.uid,
      like: [],
      text: textArea,
      username: userName,
    };

    await salvarPost(dataPost);

    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(addDoc).toHaveBeenCalledWith(mockCollection, posts);
    expect(collection).toHaveBeenCalledTimes(1);
    expect(collection).toHaveBeenCalledWith(undefined, 'posts');
  });
});

describe('pegarPost', () => {
  it('should be a function', () => {
    expect(typeof pegarPost).toBe('function');
  });
});

describe('editarPosts', () => {
  it('should be a function', () => {
    expect(typeof editarPosts).toBe('function');
  });

  it('deve editar e atualizar a publicação', async () => {
    updateDoc.mockResolvedValue();
    const mockDoc = 'doc';
    doc.mockReturnValueOnce(mockDoc);
    const editarTxt = 'editar';
    const salvarTxt = 'salvar';
    const atualizarPost = {
      text: salvarTxt,
    };
    await editarPosts(editarTxt, salvarTxt);

    expect(doc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledWith(undefined, 'posts', editarTxt);
    expect(updateDoc).toHaveBeenCalledTimes(1);
    expect(updateDoc).toHaveBeenCalledWith(mockDoc, atualizarPost);
  });
});

describe('deletarPost', () => {
  it('should be a function', () => {
    expect(typeof deletarPost).toBe('function');
  });

  it('deve excluir o post', async () => {
    const mockDoc = 'doc';
    doc.mockReturnValueOnce(mockDoc);
    deleteDoc.mockResolvedValueOnce();
    const postId = 'post';

    await deletarPost(postId);

    expect(doc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledWith(undefined, 'posts', postId);
    expect(deleteDoc).toHaveBeenCalledTimes(1);
    expect(deleteDoc).toHaveBeenCalledWith(mockDoc);
  });
});