import { container } from 'tsyringe';

import PipedriveProvider from './implementations/PipedriveProvider';
import ICRMProvider from './models/ICRMProvider';

container.registerSingleton<ICRMProvider>('CRMProvider', PipedriveProvider);
