import Peer from "peerjs";
import React, { createContext, useContext, useState } from "react";
import { generateBrokerId } from "../../services/PeerIdService";

export function createCtx<ContextType>() {
  const ctx = createContext<ContextType | undefined>(undefined);
  function useCtx() {
    const c = useContext(ctx);
    if (!c) throw new Error("useCtx must be inside a Provider with a value");
    return c;
  }
  return [useCtx, ctx.Provider] as const;
}

type P2PContextType = {
  peer: Peer;
};

export const [usePeer, CtxProvider] = createCtx<P2PContextType>();

type Props = {
  children: React.ReactNode;
};

export const P2PProvider = ({ children }: Props) => {
  const brokerId = generateBrokerId();
  const [peer] = useState<Peer>(
    new Peer(brokerId, {
      host: "peerjs.thorbenkuck.de",
      secure: true,
    })
  );
  return <CtxProvider value={{ peer }}>{children}</CtxProvider>;
};
