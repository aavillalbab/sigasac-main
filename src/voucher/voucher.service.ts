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

    async update(id: number, voucherDto: VoucherDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const result: any = await connection
                .createQueryBuilder()
                .update(Voucher)
                .set(voucherDto)
                .where('id = :id', { id })
                .execute();

            return result;
        } catch (error) {
            throw error;
        }
    }

    async changeState(id: number, state: number) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const result: any = await connection
                .createQueryBuilder()
                .update(Voucher)
                .set({ state })
                .where('id = :id', { id })
                .execute();

            return result;
        } catch (error) {
            throw error;
        }
    }
}
