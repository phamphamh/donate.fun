import { http, createConfig } from "wagmi";
import { hedera } from "wagmi/chains";

export const config = createConfig({
  chains: [hedera],
  transports: {
    [hedera.id]: http("https://295.rpc.thirdweb.com/"),
  },
});
