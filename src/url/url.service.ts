import {
        Injectable, 
        BadRequestException,
        NotFoundException,
        UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from './url.entity';

import { ShortenURLDto } from './dtos/url.dto';
import { nanoid } from 'nanoid';
import { isURL } from 'class-validator';

@Injectable()
export class UrlService {
    constructor(
        @InjectRepository(Url)
        private repo: Repository<Url>,
    ) {}

    async shortenUrl(url: ShortenURLDto) {
        const { longUrl } = url;

        // Checks if longurl is a valid URL
        if (!isURL(longUrl)) {
        throw new BadRequestException('String Must be a Valid URL');
        }
        
        // Generate the id
        const urlCode = nanoid(10);
        // Base url to append the code to
        const baseURL = 'http://localhost:3000';

        try {
            // Check if the URL has already been shortened
            let url = await this.repo.findOneBy({ longUrl });
            // Return it if it exists
            if (url) return url.shortUrl;

            //if it doesn't exist, shorten it
            const shortUrl = `${baseURL}/${urlCode}`;

            //add the new record to the database
            url = this.repo.create({
                urlCode,
                longUrl,
                shortUrl,
            });

            this.repo.save(url);
            return url.shortUrl;
        } catch (error) {
            console.log(error);
            throw new UnprocessableEntityException('Server Error');
        }
    }

    async redirect(urlCode: string) {
        try {
            const url = await this.repo.findOneBy({ urlCode });
            if (url) return url;
        } catch (error) {
            console.log(error);
            throw new NotFoundException('Resource Not Found');
        }
    }
}
