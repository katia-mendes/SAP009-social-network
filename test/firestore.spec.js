import {
  doc,
  deleteDoc,
  addDoc,
  collection,
  query,
  orderBy,
  getDocs,
} from 'firebase/firestore';

import { getAuth } from 'firebase/auth';

import {
  salvarPost,
  pegarPost,
  deletarPost,
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
        displayName: 'nomeTeste',
        uid: 'idteste',
      },
    };
    getAuth.mockReturnValueOnce(mockAuth);

    const dataPostagem = new Date();
    const textoPostagem = 'postTeste';
    const posts = {
      username: mockAuth.currentUser.displayName,
      userId: mockAuth.currentUser.uid,
      date: dataPostagem,
      text: textoPostagem,
    };

    await salvarPost(dataPostagem, textoPostagem);

    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(addDoc).toHaveBeenCalledWith(mockCollection, posts);
    expect(collection).toHaveBeenCalledTimes(1);
    expect(collection).toHaveBeenCalledWith(undefined, 'posts');
  });
});

/* describe('pegarPost', () => {
  it('should be a function', () => {
    expect(typeof pegarPost).toBe('function');
  });

  it('deve acessar a publicação criada e postar na tela', async () => {
    const mockOrderBy = 'order';
    orderBy.mockReturnValueOnce(mockOrderBy);
    const mockQuery = 'query';
    query.mockReturnValueOnce(mockQuery);
    const mockCollection = 'collection';
    collection.mockReturnValueOnce(mockCollection);
    snapShot.mockResolvedValueOnce([
      {
        id: '1',
        data: () => ({ post: 'Post um' }),
      },
      {
        id: '2',
        data: () => ({ post: 'Post dois' }),
      },
    ]);
    const acessarPost = await pegarPost();
    expect(acessarPost).toEqual([
      { id: '1', post: 'Post um' },
      { id: '2', post: 'Post dois' },
    ]);
    expect(orderBy).toHaveBeenCalledTimes(1);
    expect(orderBy).toHaveBeenCalledWith('date');
    expect(collection).toHaveBeenCalledTimes(1);
    expect(collection).toHaveBeenCalledWith(undefined, 'posts');
    expect(query).toHaveBeenCalledTimes(1);
    expect(query).toHaveBeenCalledWith(mockCollection, mockOrderBy);
    expect(snapShot).toHaveBeenCalledTimes(1);
    expect(snapShot).toHaveBeenCalledWith(mockQuery);
  });
}); */

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
