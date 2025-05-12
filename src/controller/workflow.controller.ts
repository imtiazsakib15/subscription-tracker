import { serve } from '@upstash/workflow/express';
import Subscription from '../model/subscription.model';
import { WorkflowContext } from '@upstash/workflow';
import { ISubscription } from '../interface/subscription.interface';
import dayjs from 'dayjs';

const DAYS_BEFORE_ARR: number[] = [7, 5, 3, 1];

const sendReminders = serve<{ subscriptionId: string }>(async (context) => {
  const { subscriptionId } = context.requestPayload;

  const subscription: ISubscription | null = await fetchSubscription(
    context,
    subscriptionId,
  );
  if (!subscription || subscription.status !== 'active') return;

  const renewalDate = dayjs(subscription.renewalDate);
  if (renewalDate.isBefore(dayjs())) {
    console.log('Renewal date is in the past');
    return;
  }

  // DAYS_BEFORE_ARR.forEach(async (daysBefore) => {
  //   const reminderDate = renewalDate.subtract(daysBefore, 'day');
  //   console.log(reminderDate);
  //   if (reminderDate.isAfter(dayjs())) {
  //     await sleepUntilReminder(
  //       context,
  //       `Reminder ${daysBefore} days before`,
  //       reminderDate.toDate(),
  //     );
  //   }

  //   await triggerReminder(context, `Reminder ${daysBefore} days before`);
  // });

  for (const daysBefore of DAYS_BEFORE_ARR) {
    const reminderDate = renewalDate.subtract(daysBefore, 'day');
    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(
        context,
        `Reminder ${daysBefore} days before`,
        reminderDate.toDate(),
      );
    }

    await triggerReminder(context, `Reminder ${daysBefore} days before`);
  }
});

const fetchSubscription = async (
  context: WorkflowContext,
  subscriptionId: string,
) => {
  return await context.run('getSubscription', async () => {
    return await Subscription.findById(subscriptionId).populate('user');
  });
};

const sleepUntilReminder = async (
  context: WorkflowContext,
  label: string,
  date: Date,
) => {
  console.log(`Sleep until ${label} reminder at ${date}`);
  await context.sleepUntil(label, date);
};

const triggerReminder = async (context: WorkflowContext, label: string) => {
  return await context.run(label, () => {
    console.log(`Triggering ${label} reminder`);
    // Here you can add the logic to send the reminder, e.g., sending an email or a notification
  });
};

export { sendReminders };
