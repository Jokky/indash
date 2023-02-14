import { Quotation } from 'tinkoff-invest-api/src/generated/common';

export const quotationToNumber = (value: Quotation | undefined) =>
    value ? Number(`${value.units}.${value.nano}`) : null;
