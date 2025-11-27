/**
 * Composition Root
 * サービスの依存性注入を行う
 *
 * ここでのみInfrastructure層の具象クラスに依存する
 * これにより、Services層のクラス自体はInfrastructure層に依存しない
 *
 * すべてのサービスインスタンスをここで生成し、
 * アプリケーション全体で共有されるシングルトンとして提供する
 */
import { DrizzleClosedDayRepository } from "@/infrastructure/db/repositories/drizzleClosedDayRepository";
import { DrizzleEventRepository } from "@/infrastructure/db/repositories/drizzleEventRepository";
import { ClosedDayService } from "./closedDayService";
import { EventService } from "./eventService";

/**
 * イベントサービスのインスタンス
 */
export const eventService = new EventService(new DrizzleEventRepository());

/**
 * 休業日サービスのインスタンス
 */
export const closedDayService = new ClosedDayService(
  new DrizzleClosedDayRepository(),
);
