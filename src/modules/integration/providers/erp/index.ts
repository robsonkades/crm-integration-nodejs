import { container } from 'tsyringe';

import BlingProvider from './implementations/BlingProvider';
import IERPProvider from './models/IERPProvider';

container.registerSingleton<IERPProvider>('ERPProvider', BlingProvider);
