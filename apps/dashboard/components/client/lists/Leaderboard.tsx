"use client";

import { formatNumber } from "@majoexe/util/functions/util";
import Link from "next/link";
import { useMemo } from "react";
import { ButtonSecondary } from "@/components/Buttons";
import Image from "@/components/client/shared/Image";
import { Table } from "@/components/client/shared/Table";
import { Tooltip } from "@/components/client/shared/Tooltip";
import { Icons, iconVariants } from "@/components/Icons";
import type { Column } from "react-table";
import { User } from "@majoexe/database";

export interface LeaderboardData {
 id: number;
 user: Pick<User, "discordId" | "global_name" | "name" | "avatar" | "discriminator">;
 xp: number;
 level: number;
}

export function Leaderboard({ data, showControls = true, showSearch = true }: { data: LeaderboardData[]; showControls?: boolean; showSearch?: boolean }) {
 const columns: Column<LeaderboardData>[] = useMemo(
  () => [
   {
    Header: "Position",
    accessor: "id",
    Cell: ({ value }) => `#${value}`,
   },
   {
    Header: "User",
    accessor: "user",
    Cell: ({ value }) => (
     <div id={value.discordId}>
      <Tooltip content={`Discord ID: ${value.discordId}`}>
       <Link className="flex w-fit items-center space-x-4" href={showControls ? `user/${value.discordId}` : `#${value.discordId}`} passHref>
        <div className="relative">{value.avatar && <Image src={`/api/user/avatar/${value.discordId}`} alt={`${value.name} avatar`} quality={95} width={48} height={48} className="size-12 shrink-0 rounded-full" />}</div>
        <span className="text-left font-bold">
         {value.global_name || value.name}
         {value.discriminator !== "0" && <span className="opacity-70">#{value.discriminator || "0000"}</span>}
        </span>
       </Link>
      </Tooltip>
     </div>
    ),
   },
   {
    Header: "XP",
    accessor: "xp",
    Cell: ({ value }) => (
     <Tooltip content={value}>
      <span className="cursor-help">{formatNumber(value)}</span>
     </Tooltip>
    ),
   },
   {
    Header: "Level",
    accessor: "level",
   },
   ...(showControls
    ? [
       {
        Header: "Actions",
        Cell: ({ row }: { row: { original: LeaderboardData } }) => (
         <ButtonSecondary className="!w-fit" href={`user/${row.original.user?.discordId}`}>
          <Icons.User className={iconVariants({ variant: "button" })} />
          View profile
         </ButtonSecondary>
        ),
       },
      ]
    : []),
  ],
  [showControls]
 );

 return <Table columns={columns} data={data} showControls={showControls} showSearch={showSearch} sortBy={[{ id: "id", desc: false }]} />;
}
