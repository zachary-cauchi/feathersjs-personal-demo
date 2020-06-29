import * as authentication from '@feathersjs/authentication';
import { HookContext } from '@feathersjs/feathers';
import processMessage from '../../hooks/process-message';
import populateUser from '../../hooks/populate-user';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

const setTimestamp = (name: string) => {
  return async (context: HookContext) => {
    context.data[name] = new Date();

    return context;
  }
}

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [setTimestamp('createdAt'), processMessage()],
    update: [ setTimestamp('updatedAt') ],
    patch: [],
    remove: []
  },

  after: {
    all: [populateUser()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
