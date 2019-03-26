export type ServiceModel = DockerServiceModel;

export interface DockerServiceModel {
    type: 'docker';
    name: string;
    id: string;
    image: string;
}
