import { Injectable } from '@nestjs/common';

import { DatabaseProvider, Voucher } from 'sigasac-db';
import { VoucherDto } from './dto';

@Injectable()
export class VoucherService {
    async create(voucherDto: VoucherDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const voucher = await connection
                .getRepository(Voucher)
                .save(voucherDto);

            return voucher;
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const connection = await DatabaseProvider.getConnection();

            const vouchers = await connection
                .getRepository(Voucher)
                .createQueryBuilder()
                .getMany();

            return vouchers;
        } catch (error) {
            throw error;
        }
    }
}
