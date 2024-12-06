import { SelectQueryBuilder } from "typeorm";

export function paginateQuery (query: SelectQueryBuilder<any>, options: any) {
    if (options.page) {
	query.skip((options.page - 1) * options.pageSize);
	query.take(options.pageSize);
    }
}
