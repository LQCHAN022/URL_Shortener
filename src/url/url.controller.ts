import { 
        Controller, 
        Body, 
        Get, 
        Param,
        Post,
        Res 
} from '@nestjs/common';
import { ShortenURLDto } from './dtos/url.dto';
import { UrlService } from './url.service';

@Controller() // "url" removed to handle shortened links (that does not have /url/ in route)
export class UrlController {
    constructor(
        private service: UrlService
    ) {}

    @Post("shorten")
    shortenUrl(
        @Body() url: ShortenURLDto,
    ) {
        return this.service.shortenUrl(url);
    }

    @Get(":code")
    async redirect(
        @Res() res,
        @Param("code") code: string,
    ) {
        const url = await this.service.redirect(code);

        return res.redirect(url.longUrl)
    }

}
