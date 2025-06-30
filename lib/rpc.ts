import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.join(process.cwd(), 'proto/wallet.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const walletProto = grpc.loadPackageDefinition(packageDefinition).wallet as any;

const client = new walletProto.WalletService(
  process.env.GRPC_SERVER_ADDRESS ?? 'localhost:50051',
  grpc.credentials.createInsecure()
);

export const createWallet = (): Promise<{ address: string; privateKey: string }> => {
  return new Promise((resolve, reject) => {
    client.CreateWallet({}, (err: any, response: any) => {
      if (err) return reject(err);
      resolve(response);
    });
  });
};

export const getAccountInformation = (address: string): Promise<{ nftIds: number[] }> => {
  return new Promise((resolve, reject) => {
    client.GetAccountInformation({ address }, (err: any, response: any) => {
      if (err) return reject(err);
      resolve(response);
    });
  });
};

export const getAssetById = (assetId: number): Promise<{ url: string }> => {
  return new Promise((resolve, reject) => {
    client.GetAssetByID({ assetId }, (err: any, response: any) => {
      if (err) return reject(err);
      resolve(response);
    });
  });
};

export const createNFT = (params: {
  senderAddress: string;
  senderPrivateKey: string;
  assetName: string;
  unitName: string;
  assetURL: string;
}): Promise<{ txId: string }> => {
  return new Promise((resolve, reject) => {
    client.CreateNFT(params, (err: any, response: any) => {
      if (err) return reject(err);
      resolve(response);
    });
  });
};

export const sendNFT = (params: {
  senderAddress: string;
  senderPrivateKey: string;
  receiverAddress: string;
  nftAssetId: number;
}): Promise<{ txId: string }> => {
  return new Promise((resolve, reject) => {
    client.SendNFT(params, (err: any, response: any) => {
      if (err) return reject(err);
      resolve(response);
    });
  });
};
