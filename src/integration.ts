import 'reflect-metadata';
import '@shared/container';

import { SQSHandler, Handler } from 'aws-lambda';
import { container } from 'tsyringe';
import '@config/database';

import IDeal from '@modules/integration/dtos/IDeal';
import CreateInitialChargeService from '@modules/integration/services/CreateInitialCharge.service';
import ProcessDealsService from '@modules/integration/services/ProcessDeals.service';
import UpdateAggregationOrdersService from '@modules/integration/services/UpdateAggregationOrders.service';

export const initialCharge: SQSHandler = async () => {
  const createInitialChargeService = container.resolve(
    CreateInitialChargeService,
  );
  await createInitialChargeService.execute();
};

export const process: SQSHandler = async (event, _) => {
  if (event.Records) {
    const deals = event.Records.map(item => JSON.parse(item.body) as IDeal);
    await ProcessDealsService.execute(deals);
  }
};

export const scheduler: Handler = async () => {
  const updateAggregationOrdersService = container.resolve(
    UpdateAggregationOrdersService,
  );
  await updateAggregationOrdersService.execute();
};
