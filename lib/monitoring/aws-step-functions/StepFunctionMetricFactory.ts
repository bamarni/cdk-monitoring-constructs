import { DimensionsMap } from "aws-cdk-lib/aws-cloudwatch";
import { IStateMachine } from "aws-cdk-lib/aws-stepfunctions";

import {
  BaseMetricFactory,
  BaseMetricFactoryProps,
  MetricFactory,
  MetricStatistic,
  RateComputationMethod,
} from "../../common";

const Namespace = "AWS/States";

export interface StepFunctionMetricFactoryProps extends BaseMetricFactoryProps {
  readonly stateMachine: IStateMachine;
  /**
   * @default - average
   */
  readonly rateComputationMethod?: RateComputationMethod;
}

export class StepFunctionMetricFactory extends BaseMetricFactory<StepFunctionMetricFactoryProps> {
  protected readonly rateComputationMethod: RateComputationMethod;
  protected readonly dimensionsMap: DimensionsMap;

  constructor(
    metricFactory: MetricFactory,
    props: StepFunctionMetricFactoryProps,
  ) {
    super(metricFactory, props);

    this.rateComputationMethod = RateComputationMethod.AVERAGE;
    this.dimensionsMap = {
      StateMachineArn: props.stateMachine.stateMachineArn,
    };
  }

  metricExecutionTimeP99InMillis() {
    return this.metricFactory.createMetric(
      "ExecutionTime",
      MetricStatistic.P99,
      "P99",
      this.dimensionsMap,
      undefined,
      Namespace,
      undefined,
      this.region,
      this.account,
    );
  }

  metricExecutionTimeP90InMillis() {
    return this.metricFactory.createMetric(
      "ExecutionTime",
      MetricStatistic.P90,
      "P90",
      this.dimensionsMap,
      undefined,
      Namespace,
      undefined,
      this.region,
      this.account,
    );
  }

  metricExecutionTimeP50InMillis() {
    return this.metricFactory.createMetric(
      "ExecutionTime",
      MetricStatistic.P50,
      "P50",
      this.dimensionsMap,
      undefined,
      Namespace,
      undefined,
      this.region,
      this.account,
    );
  }

  metricExecutionsFailed() {
    return this.metricFactory.createMetric(
      "ExecutionsFailed",
      MetricStatistic.SUM,
      "Failed",
      this.dimensionsMap,
      undefined,
      Namespace,
      undefined,
      this.region,
      this.account,
    );
  }

  metricExecutionsFailedRate() {
    const metric = this.metricExecutionsFailed();
    return this.metricFactory.toRate(
      metric,
      this.rateComputationMethod,
      false,
      "faults",
    );
  }

  metricExecutionsTimedOut() {
    return this.metricFactory.createMetric(
      "ExecutionsTimedOut",
      MetricStatistic.SUM,
      "Timeout",
      this.dimensionsMap,
      undefined,
      Namespace,
      undefined,
      this.region,
      this.account,
    );
  }

  metricExecutionThrottled() {
    return this.metricFactory.createMetric(
      "ExecutionThrottled",
      MetricStatistic.SUM,
      "Throttled",
      this.dimensionsMap,
      undefined,
      Namespace,
      undefined,
      this.region,
      this.account,
    );
  }

  metricExecutionsAborted() {
    return this.metricFactory.createMetric(
      "ExecutionsAborted",
      MetricStatistic.SUM,
      "Aborted",
      this.dimensionsMap,
      undefined,
      Namespace,
      undefined,
      this.region,
      this.account,
    );
  }

  metricExecutionsStarted() {
    return this.metricFactory.createMetric(
      "ExecutionsStarted",
      MetricStatistic.SUM,
      "Started",
      this.dimensionsMap,
      undefined,
      Namespace,
      undefined,
      this.region,
      this.account,
    );
  }

  metricExecutionsSucceeded() {
    return this.metricFactory.createMetric(
      "ExecutionsSucceeded",
      MetricStatistic.SUM,
      "Succeeded",
      this.dimensionsMap,
      undefined,
      Namespace,
      undefined,
      this.region,
      this.account,
    );
  }
}
