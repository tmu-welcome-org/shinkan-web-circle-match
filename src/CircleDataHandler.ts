import appConfig from './config.json'

export type CircleLink = {
    type: "website" | "twitter" | "instagram" | "lineOC" | "lineOfficial" | "youtube";
    label: string;
    uri: string;
};

export type CircleItem = {
    circle_name: string;
    catchphrase: string;
    description: string;
    images: string[];
    links: CircleLink[];
    mail: string;
    tags: string[];
};

export type CircleData = {
    metadata: {
        year: number;
        build: string;
    };
    circles: Record<string, CircleItem>;
};

export default class CircleDataHandler {
    private static dataPath = `${import.meta.env.BASE_URL}${appConfig.circle_data_dir}/${appConfig.circle_data_file}`;
    private static cache: CircleData | null = null;

    static async fetchData(forceRefresh = false): Promise<CircleData> {
        if (!forceRefresh && this.cache) {
            return this.cache;
        }

        const fetchURL = `${this.dataPath}?t=${Date.now()}`; // Cache busting with timestamp

        const response = await fetch(fetchURL, {
            headers: {
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch circle data: ${response.status}`);
        }

        const data = (await response.json()) as CircleData;
        this.cache = data;
        return data;
    }

    static getData(): CircleData | null {
        return this.cache;
    }
}