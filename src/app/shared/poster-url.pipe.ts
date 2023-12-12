import { Pipe, PipeTransform } from "@angular/core";
import { HttpService } from "../services/http.service";

@Pipe({
    name: 'posterUrl'
})

export class PosterUrlPipe implements PipeTransform{
    constructor(private httpService: HttpService) { }

    transform(path: string): string {
        return this.httpService.getPosterUrl(path)
    }
}
