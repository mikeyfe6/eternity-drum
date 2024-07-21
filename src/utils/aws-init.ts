import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

const s3 = new S3Client({
    region: process.env.GATSBY_AWS_EP_REGION ?? '',
    credentials: {
        accessKeyId: process.env.GATSBY_AWS_EP_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.GATSBY_AWS_EP_SECRET_ACCESS_KEY ?? '',
    }
});

const fetchS3Files = async (bucketName: string, prefix: string) => {
    try {
        const command = new ListObjectsV2Command({
            Bucket: bucketName,
            Prefix: prefix,
        });

        const data = await s3.send(command);

        if (data.Contents) {
            return data.Contents
                .filter((object) => object.Key && object.Key !== `${prefix}`)
                .map((object) => {
                    const fullTitle = object.Key?.split('/').pop();
                    let title: string | undefined;
                    const isMusic = prefix.includes('music');

                    if (isMusic && fullTitle) {
                        title = fullTitle.substring(3, fullTitle.length - 4);
                        title = title.replace(/-/g, ' ');
                    }

                    return {
                        title: title || fullTitle || 'Untitled',
                        artist: 'Eternity Percussion',
                        src: `${process.env.GATSBY_AWS_URL ?? ''}${object.Key ?? ''}`,
                    };
                });
        } else {
            console.error('No contents found in the bucket.');
            return [];
        }
    } catch (error) {
        console.error('Error fetching files from S3:', error);
        return [];
    }
};

export { fetchS3Files };
